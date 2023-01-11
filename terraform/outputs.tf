output "docker_image_name" {
  value = var.DOCKER_IMAGE_NAME
}

output "docker_image_tag" {
  value = var.DOCKER_IMAGE_TAG
}

output "app-name_hostname" {
  value = azurerm_linux_web_app.app-name.default_hostname
}