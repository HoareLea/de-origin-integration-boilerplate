data "azurerm_dns_zone" "example" {
  name                = "originaec.app"
  # resource_group_name = var.resource_group_name
}

resource "azurerm_dns_cname_record" "example" {
  name                = var.domain_name
  zone_name           = data.azurerm_dns_zone.example.name
  resource_group_name = data.azurerm_dns_zone.example.resource_group_name
  ttl                 = 300
  record              = var.webapp_hostname
}

resource "azurerm_dns_txt_record" "example" {
  name                = "asuid.${azurerm_dns_cname_record.example.name}"
  zone_name           = data.azurerm_dns_zone.example.name
  resource_group_name = data.azurerm_dns_zone.example.resource_group_name
  ttl                 = 300
  record {
    value = var.webapp_verification_id
  }
}

resource "azurerm_app_service_custom_hostname_binding" "example" {
  hostname            = trim(azurerm_dns_cname_record.example.fqdn, ".")
  app_service_name    = var.webapp_name
  resource_group_name = var.resource_group_name
  depends_on          = [azurerm_dns_txt_record.example]

  # Ignore ssl_state and thumbprint as they are managed using
  # azurerm_app_service_certificate_binding.example
  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }
}

resource "azurerm_app_service_managed_certificate" "example" {
  custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.example.id
}

resource "azurerm_app_service_certificate_binding" "example" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.example.id
  certificate_id      = azurerm_app_service_managed_certificate.example.id
  ssl_state           = "SniEnabled"
}