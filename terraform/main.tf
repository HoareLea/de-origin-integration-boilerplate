
# Configure the Azure provider
terraform {
  cloud {
    organization = "OriginAEC"
    workspaces {
      name = "app-name-dev"
    }
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

data "terraform_remote_state" "origin-dev-tf" {
  backend = "remote"
  config = {
    organization = "OriginAEC"
    workspaces = {
      name = "Origin_Core-dev"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.AZ_SUBSCRIPTION
  client_id = var.pu
  client_secret = var.pk
  tenant_id = var.tn
}

# create some local variables to combine with the .env
locals {
  dockerhub = {
    "un"  = var.docker_hub_id,
    "pw"  = var.docker_hub_pw,
    "url" = var.docker_hub_url
  }
}

#resource group should already exist
data "azurerm_resource_group" "api" {
  name = "${var.product}-${var.envname}"
}

data "azurerm_service_plan" "api" {
  name                = "${var.product}-${var.envname}-api-sp"
  resource_group_name = data.azurerm_resource_group.api.name
}

resource "azurerm_linux_web_app" "app-name" {
  name                = "${var.product}-${var.envname}-app-name-web"
  location            = data.azurerm_resource_group.api.location
  resource_group_name = data.azurerm_resource_group.api.name
  service_plan_id     = data.azurerm_service_plan.api.id
  https_only          = true
  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "WEBSITES_PORT"                       = "80"
    "DOCKER_REGISTRY_SERVER_PASSWORD"     = local.dockerhub.pw
    "DOCKER_REGISTRY_SERVER_URL"          = local.dockerhub.url
    "DOCKER_REGISTRY_SERVER_USERNAME"     = local.dockerhub.un
  }

  site_config {
    always_on = true
    application_stack {
      docker_image     = var.DOCKER_IMAGE_NAME
      docker_image_tag = var.DOCKER_IMAGE_TAG
    }
  }

}

# Add custom domains with ssl
# Do not use for now until we resolve strategy
# module "custom_domains" {
#   source                 = "./custom_domains_ssl"
#   domain_name            = var.CUSTOM_DOMAIN
#   resource_group_name    = data.azurerm_resource_group.api.name
#   webapp_hostname        = azurerm_linux_web_app.app-name.default_hostname
#   webapp_verification_id = azurerm_linux_web_app.app-name.custom_domain_verification_id
#   webapp_name            = azurerm_linux_web_app.app-name.name
# }