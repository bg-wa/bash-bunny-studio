class DashboardController < ApplicationController
  def index
    @loaded_extensions = []
    if @bash_bunny_path.include?('/')
      Dir.foreach("#{@bash_bunny_path}/payloads/extensions") do |extension|
        @loaded_extensions << extension
      end
    end
  end

  def write_payload
    file_path = "#{@bash_bunny_path}#{params[:file]}"
    File.open(file_path, 'w') { |file| file.write(params[:payload]) }
    render json: {
        status: 200,
        file: file_path
    }
  end

  def check_repo
    if File.exist?("#{@local_repo_path}/README.md")
      render json: {
          status: 200
      }
    else
      render json: {
          status: 500
      }
    end
  end

  def clone_repo
    Git.clone(params[:repo], '', path: @local_repo_path)
    render json: {
        status: 200
    }
  end

  def git_command
    output = `cd #{@local_repo_path} && git #{params[:command]}`
    render json: {
        status: 200,
        output: output
    }
  end

  def delete_repo
    FileUtils.rm_r @local_repo_path, force: true
    FileUtils.mkpath @local_repo_path unless File.exist?(@local_repo_path)
    render json: {
        status: 200
    }
  end

  def sync_extensions
    extension_path = '/payloads/extensions'
    FileUtils.rm_r "#{@bash_bunny_path}#{extension_path}", force: true
    FileUtils.mkpath "#{@bash_bunny_path}#{extension_path}"
    extensions = params[:extensions].split(',')
    index = 0
    if @bash_bunny_path.include?('/')
      Dir.foreach("#{@local_repo_path}#{extension_path}") do |extension|
        index += 1
        next if extension == '.' || extension == '..'
        if extensions.include?(index.to_s)
          FileUtils.cp "#{@local_repo_path}#{extension_path}/#{extension}", "#{@bash_bunny_path}#{extension_path}/#{extension}"
        end
      end
    end
    render json: {
        status: 200
    }
  end

  def copy_payload
    FileUtils.rm_r "#{@bash_bunny_path}/payloads/switch#{params[:switch_position]}", force: true
    FileUtils.mkpath "#{@bash_bunny_path}/payloads/switch#{params[:switch_position]}"
    FileUtils.cp_r "#{params[:path]}/.", "#{@bash_bunny_path}/payloads/switch#{params[:switch_position]}/"
    render json: {
        status: 200
    }
  end

  def eject_bunny
    if File.exist?(@bash_bunny_path)
      begin
        `umount #{@bash_bunny_path}`
        FileUtils.rm_r @bash_bunny_path
        render json: {
            status: 200
        }
      rescue
        # Windows - Untested
        `mountvol #{@bash_bunny_path} /D`
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
    file_path = "#{@bash_bunny_path}#{params[:file]}"
    render json: {
        status: 200,
        payload: File.exist?(file_path) ? File.read(file_path) : '',
        file: file_path
    }
  end

  def raw_file
    render plain: File.read("#{@bash_bunny_path}#{params[:path]}/#{params[:file]}")
  end
end
