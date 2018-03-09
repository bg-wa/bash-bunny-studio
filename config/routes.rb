Rails.application.routes.draw do
  namespace 'studio' do
    get 'switch1'
    get 'switch2'
    get 'extensions'
    get 'payloads'
    get 'loot'
    get 'debug'
    get 'git'
    get 'learn'

    # API
    get 'clone_repo'
    get 'git_command'
    get 'delete_repo'
    get 'eject_bunny'
    get 'copy_payload'
    get 'sync_extensions'
    get 'raw_file'
    get 'payload_script'

    post 'write_payload'
  end
  get 'studio', to: 'studio#switch1'

  root 'studio#switch1'
end
