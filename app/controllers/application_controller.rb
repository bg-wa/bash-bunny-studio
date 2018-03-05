class ApplicationController < ActionController::Base
  require 'sys/filesystem'
  include Sys

  protect_from_forgery with: :exception
  before_action :bunny_paths

  def bunny_paths
    bunny_mount = Filesystem.mounts.select { |mount| mount.mount_point.include? 'BashBunny' }.first
    if bunny_mount.nil?
      @bash_bunny_path = 'BashBunny Not Found'
    else
      @bash_bunny_path = bunny_mount.mount_point
      @payload_one_path = "#{@bash_bunny_path}/payloads/switch1/payload.txt"
      @payload_two_path = "#{@bash_bunny_path}/payloads/switch2/payload.txt"
      @switch_one_text = File.exist?(@payload_one_path) ? File.read(@payload_one_path) : ''
      @switch_two_text = File.exist?(@payload_two_path) ? File.read(@payload_two_path) : ''
    end
    @local_repo_path = 'public/bash_bunny_repo'
    FileUtils.mkpath @local_repo_path unless File.exist?(@local_repo_path)
  end

end
