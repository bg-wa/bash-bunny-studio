class StudioController < ApplicationController
  require 'nokogiri'
  require 'open-uri'

  def switch1
    @page_title = 'Switch 1'
  end

  def switch2
    @page_title = 'Switch 2'
  end

  def payloads
    @page_title = 'Payloads'
  end

  def git
    @page_title = 'Git'
  end

  def loot
    @page_title = 'Loot'
    if bunny_mounted?
      @loot_path = "#{bunny_path}/loot"
      FileUtils.mkpath @loot_path unless File.exist?(@loot_path)
    end
  end

  def extensions
    @page_title = 'Extensions'
    @loaded_extensions = []
    if bunny_mounted?
      Dir.foreach("#{bunny_path}/payloads/extensions") do |extension|
        @loaded_extensions << extension
      end
    end
  end

  def debug
    @page_title = 'Debug'
    if bunny_mounted?
      @debug_path = "#{bunny_path}/debug"
      FileUtils.mkpath @debug_path unless File.exist?(@debug_path)
    end
  end

  def learn
    @page_title = 'Learn'
  end

  def configure
    @page_title = 'Configure'
  end

  def firmware
    @page_title = 'Firmware'
  end

  # API

  def write_payload
    if bunny_mounted?
      file_path = "#{bunny_path}#{params[:file]}"
      File.open(file_path, 'w') { |file| file.write(params[:payload]) }
      render json: {
          status: 200,
          file: file_path
      }
    else
      render json: {
          status: 500
      }
    end
  end

  def clone_repo
    Git.clone(params[:repo], '', path: local_repo_path)
    render json: {
        status: 200
    }
  end

  def git_command
    output = `cd #{local_repo_path} && git #{params[:command]}`
    render json: {
        status: 200,
        output: output
    }
  end

  def delete_repo
    FileUtils.rm_r local_repo_path, force: true
    FileUtils.mkpath local_repo_path
    render json: {
        status: 200
    }
  end

  def sync_extensions
    if bunny_mounted?
      extension_path = '/payloads/extensions'
      FileUtils.rm_r "#{bunny_path}#{extension_path}", force: true
      FileUtils.mkpath "#{bunny_path}#{extension_path}"
      extensions = params[:extensions].split(',')
      index = 0
      if bunny_mounted?
        Dir.foreach("#{local_repo_path}#{extension_path}") do |extension|
          index += 1
          next if extension == '.' || extension == '..'
          if extensions.include?(index.to_s)
            FileUtils.cp "#{local_repo_path}#{extension_path}/#{extension}", "#{bunny_path}#{extension_path}/#{extension}"
          end
        end
      end
      render json: {
          status: 200
      }
    else
      render json: {
          status: 500
      }
    end
  end

  def copy_payload
    if bunny_mounted?
      FileUtils.rm_r "#{bunny_path}/payloads/switch#{params[:switch_position]}", force: true
      FileUtils.mkpath "#{bunny_path}/payloads/switch#{params[:switch_position]}"
      FileUtils.cp_r "#{params[:path]}/.", "#{bunny_path}/payloads/switch#{params[:switch_position]}/"
      render json: {
          status: 200
      }
    else
      render json: {
          status: 500
      }
    end
  end

  def eject_bunny
    if File.exist?(bunny_path)
      begin
        `umount #{bunny_path}`
        render json: {
            status: 200
        }
      rescue
        # Windows - Untested
        `mountvol #{bunny_path} /D`
        render json: {
            status: 200
        }
      end
    else
      render json: {
          status: 500
      }
    end
  end

  def payload_script
    file_path = "#{bunny_path}#{params[:file]}"
    render json: {
        status: 200,
        payload: File.exist?(file_path) ? File.read(file_path) : '',
        file: file_path
    }
  end

  def raw_file
    render plain: File.read("#{params[:path]}/#{params[:file]}")
  end

  def share_internet
  #   download and run bb.sh here
  end
end
