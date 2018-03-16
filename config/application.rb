require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BunnyStudio
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    #RVT
    device_location = OS.linux? ? '/dev/ttyACM0' : '/dev/tty.usbmodemch000001'
    config.rvt.command = "sudo screen #{device_location} 115200"
    config.rvt.style.colors = :monokai

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
