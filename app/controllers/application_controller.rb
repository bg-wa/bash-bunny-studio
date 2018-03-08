class ApplicationController < ActionController::Base
  require 'sys/filesystem'
  include Sys

  protect_from_forgery with: :exception

  helper_method :bunny_path
  helper_method :bunny_mounted?
  helper_method :local_repo_path

  def bunny_path
    bunny_mount = Filesystem.mounts.select { |mount| mount.mount_point.include? 'BashBunny' }.first
    bunny_mount.nil? ? nil : bunny_mount.mount_point
  end

  def local_repo_path
    repo_path = 'public/bash_bunny_repo'
    FileUtils.mkpath repo_path unless File.exist?(repo_path)
    repo_path
  end

  def bunny_mounted?
    bunny_path.nil? ? false : true
  end

end
