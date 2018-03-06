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
    if(params[:switch_position].to_i ==1)
      payload_file = @payload_one_path
    else
      payload_file = @payload_two_path
    end
    File.open(payload_file, 'w') { |file| file.write(params[:payload]) }
    render json: {
        status: 200
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

  def pull_repo
    git = Git.open(@local_repo_path)
    git.pull
    render json: {
        status: 200
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
    FileUtils.rm_r "#{@bash_bunny_path}/payloads/extensions", force: true
    FileUtils.mkpath "#{@bash_bunny_path}/payloads/extensions"
    extensions = params[:extensions].split(',')
    index = 0
    if @bash_bunny_path.include?('/')
      Dir.foreach("#{@local_repo_path}/payloads/extensions") do |extension|
        index += 1
        next if extension == '.' || extension == '..'
        if extensions.include?(index.to_s)
          FileUtils.cp "#{@local_repo_path}/payloads/extensions/#{extension}", "#{@bash_bunny_path}/payloads/extensions/#{extension}"
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
    if params[:switch_position].to_i == 1
      render json: {
          status: 200,
          payload: @switch_one_text
      }
    else
      render json: {
          status: 200,
          payload: @switch_two_text
      }
    end
  end

  def raw_file
    render plain: File.read("#{@bash_bunny_path}#{params[:path]}/#{params[:file]}")
  end
end
