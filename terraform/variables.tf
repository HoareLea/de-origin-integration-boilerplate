variable "envname" {
  type        = string
  description = "The environemnt name used for all resources in this example"
}

variable "product" {
  type        = string
  description = "The name of this product instance"
  default     = "Origin"
}

variable "AZ_SUBSCRIPTION" {
  type = string
}
variable "pu" {
  type = string
}
variable "pk" {
  type = string
}
variable "tn" {
  type = string
}

variable "docker_hub_id" {
  type        = string
  description = "The user id of the docker hub account"
}

variable "docker_hub_pw" {
  type        = string
  description = "The password of the docker hub account"
}

variable "docker_hub_url" {
  type        = string
  description = "The url of the docker hub registry"
}

variable "DOCKER_IMAGE_NAME" {
  type        = string
  description = "Environment variable for docker image name"
}

variable "DOCKER_IMAGE_TAG" {
  type        = string
  description = "Environment variable for docker image tag"
}

variable "CUSTOM_DOMAIN" {
  type        = string
  description = "The custom domain of the app"
}