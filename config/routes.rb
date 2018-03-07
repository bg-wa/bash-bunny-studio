Rails.application.routes.draw do
  get 'dashboard/index'
  get 'dashboard/check_repo'
  get 'dashboard/clone_repo'
  get 'dashboard/git_command'
  get 'dashboard/delete_repo'
  get 'dashboard/eject_bunny'
  get 'dashboard/copy_payload'
  get 'dashboard/sync_extensions'
  get 'dashboard/raw_file'
  post 'dashboard/write_payload'
  get 'dashboard/payload_script'
  get 'dashboard/index'

  root 'dashboard#index'
end
