
<span style="color:red"># Deploy GitLab To Kubernetes</span>

## B1: Init Helm

    sh install.sh


-   B2: run 'sh run.sh' de deploy Gitlab len Kubernetes (chu y tao namespace tren Kubernetes tuong ung)
-   B3: exec vao Pod dang chay (gitlab-gitlab)
-   B4: 'vi /etc/gitlab/gitlab.rb'
-   b5: Insert them vao file nay

        gitlab_rails['time_zone'] = "Hanoi"
        gitlab_rails['omniauth_block_auto_created_users'] = false
        gitlab_rails['omniauth_allow_single_sign_on'] = ['google_oauth2']
        external_url 'http://gitlab.quant-edge.com'
        gitlab_rails['omniauth_enabled'] = true
        gitlab_rails['omniauth_external_providers'] = ['google_oauth2']
        gitlab_rails['omniauth_providers'] = [
        {
            "name" => "google_oauth2",
            "app_id" => "255572427065-shd49ftva857vpgs7c7sqrh9ln6fu7ck.apps.googleusercontent.com",
            "app_secret" => "XMEQ-FvHU9tNPz0wvzRObhHL",
            "args" => { "access_type" => "offline", "approval_prompt" => '' }
        }
        ]

        # cau hinh backup
        gitlab_rails['manage_backup_path'] = true
        gitlab_rails['backup_path'] = "/var/opt/gitlab/backups"
        gitlab_rails['backup_keep_time'] = 864000
        gitlab_rails['backup_upload_connection'] = {
            'provider' => 'Google',
            'google_project' => 'equix-dev3',
            'google_storage_access_key_id' => 'GOOGPBBOBYVSEUPYDNE2',
            'google_storage_secret_access_key' => 'QIUnEzsjOvEylktdNK3XObJE/ZH5KlXP0vrG9oL1'
        }
        gitlab_rails['backup_upload_remote_directory'] = 'quantedge-gitlab-backup'

        #  cau hinh ssl
        nginx['redirect_http_to_https'] = true
        nginx['ssl_certificate'] = "/etc/gitlab/ssl/crt.crt"
        nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/key.key"

-   B6: Save lai va run 'gitlab-ctl reconfigure'

-   Backup and Restore ( Url: '/var/opt/gitlab/backups/' )
    -   Lenh BackUp:  'gitlab-rake gitlab:backup:create'
    -   Lenh Restore: 'gitlab-rake gitlab:backup:restore BACKUP=1493107454_2017_04_25_9.1.0'
                      'gitlab-ctl restart'
    -   File backup nam tren equix-dev3, o Bucket quantedge-gitlab-backup

--------------------DONE-------------------