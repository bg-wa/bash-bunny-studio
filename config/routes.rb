Rails.application.routes.draw do
  get 'studio/switch1'
  get 'studio/switch2'
  get 'studio/extensions'
  get 'studio/payloads'
  get 'studio/loot'
  get 'studio/debug'
  get 'studio/git'
  get 'studio/learn'

  get 'studio/clone_repo'
  get 'studio/git_command'
  get 'studio/delete_repo'
  get 'studio/eject_bunny'
  get 'studio/copy_payload'
  get 'studio/sync_extensions'
  get 'studio/raw_file'
  get 'studio/payload_script'

  post 'studio/write_payload'


  root 'studio#switch1'
end
