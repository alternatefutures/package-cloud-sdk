// TODO: Keep only the required environment variables
import { vi } from 'vitest';

vi.stubEnv('SECRET_JWT_IDENTITY', 'oAAAKKKKacbdcbdbcd8778767778889AAAAAAA99999');
vi.stubEnv('SECRET_JWT_CHALLENGE', 'ZWV1ZUNYUXlaWWRpaHZORkR4MCtvQXF0TDg1MGFqVitOTW1kUXZZR2V0ZDVlWVdIL1FIYTh6cGpTQm5aM2x4Ywo=');
vi.stubEnv('WEB3AUTH_CLIENT_ID', '888999lllQpRlWBgt7OA3S6P1MTP3i999000K48cl6xW6bwFBNRH0Smuw83hp_cT_rUFo1OJvgQD0R8ZQ0099l9');
vi.stubEnv('KMS_KEY_ID', 'clhudvbzd000008mn9l2e9dfv');
vi.stubEnv('NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID', 'abcdef1234567890');
vi.stubEnv(
  'DYNAMIC_PUBLIC_KEY',
  `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlySGksXd0il7TCfNVgfD
BhFoUutXurtgqLjy+P9CMmDoI4P6OP9j6K5ixa29t7U0Sf/fwvbTdjvxROEoX/Gn
RI/Q/1IfmEM5BnnUmQTEGcCXbSmT2XBlaZ31weYiZzc60HXRn6pKCxHmUFGxYdL4
uHub5NxxsxVtdmBregk4d0y2DdilefyyfRbbF0Mf48qBeNZCPVM3HMsvqirb0Sgi
CvHLnBgJebts5J1kkYqDli3waQaWSysdbzE3s6N0AWMURfqUP+ddWzzd0ZeSoFeV
eXXh5E2/qvMQY/ZKoAhtHeYEl33eSIQSS4V8GJ3lFPQkD12HyDrQPL1fKMKQwAt3
lZwZgKyR9ExBKaDJG9Ty308OjbMcu7RbS/KoG+vTHZrLDo2H3dsjBb6Ebc9sv4ax
CK2Sruvl3hzgs1wzzR6uLhTCb+HazK2O194gze5fQpJ/xUgHSW3nd0vXQHR96RlQ
GpCDh0HyZjYvx4uVK+eHDiwV2QmXbtSk1mHMB7egwTAGl8j7tITo+bmTS7JCUSG7
zojn0zo+TGyhWIHWC4EENH2oILhjUM3F1uYFb4BSuHDaMAyQbrJnyg9sK8DfnTa1
ojybPkp2jysj6/rH7MFh2FVoMXJYpVuWhD8GRNBs1uryevQspgSUuCGnCxyEOIMe
edHrl3mSKY3Pe47SbHqRNE8CAwEAAQ==
-----END PUBLIC KEY-----`
);
vi.stubEnv('SITE_PLACEHOLDER_URL', 'https://ipfs.io/ipfs/QmdG8HaQAYccz22zLgJ33trzu8g6wjF6e48YbBEZhbz342');
vi.stubEnv('SITE_SLUG_DOMAIN', 'on-af-test.app');
vi.stubEnv('STORAGE_PROXY_DOMAIN', 'https://storage.dev.on-af-test.app');
vi.stubEnv('IPFS_GATEWAY_HOSTNAME', 'gateway-ipfs.afsandbox.xyz');
vi.stubEnv('X_GITHUB_APP_NAME', 'AF App');
vi.stubEnv('X_GITHUB_APP_CLIENT_ID', '97788777');
vi.stubEnv('X_GITHUB_CALLBACK_URL', 'https://github.service.afsandbox.xyz/callback');
vi.stubEnv('SECRETS_KMS_KEY_ID', 'clhudvbzd000008mn9l2e9dfv');
vi.stubEnv('SECRETS_KMS_V0_KEY_ID', 'clhudvbzd000008mn9l2e9fgb');
vi.stubEnv('DEPLOY_GITHUB_SITES_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('PUBLISH_DEPLOYMENT_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('PURGE_SITE_CACHE_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('CANCEL_DEPLOYMENT_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('DELETE_PRIVATE_GATEWAY_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('DELETE_DOMAIN_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('DELETE_ZONE_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('DELETE_SITE_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('DELETE_PROJECT_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('TRIGGER_DEPLOYMENT_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('BUILD_ECS_CLUSTER_ARN', 'some-arn');
vi.stubEnv('UPLOAD_PIN_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('SAVE_AND_PROPAGATE_PIN_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('REVIEW_TEMPLATE_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('MIGRATE_AF_CO_TEAMS_TO_AF_XYZ_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('INTERNAL_IPFS_STORAGE_HOSTNAME', 'storage-ipfs.internal.afsandbox.xyz');
vi.stubEnv('GATEWAY_ACCESS_KEY_ID', '7838383738accc');
vi.stubEnv('GATEWAY_SECRET_ACCESS_KEY', 'C00k82Sruvl3hzgs1wzzR6uLhTCb+HbbK2O194gze5fQpJ/xUgHSW3nd0vXQHR96Raa');
vi.stubEnv('COMMIT_HASH', '0fabad88415cedb2c3c21548afa14a949a088954');
vi.stubEnv('UI__APP_URL', 'https://app.af.xyz');
vi.stubEnv('IPFS_FILES_S3_BUCKET_NAME', 'some-bucket-name');
vi.stubEnv('FUNCTIONS_SLUG_DOMAIN', 'dev.on-af-functions.app');
vi.stubEnv('AF_CO_AWS_SECRET_KEY_ID', 'id');
vi.stubEnv('AF_CO_AWS_SECRET_ACCESS_KEY', '00k82Sruvl3hzgs');
vi.stubEnv('DISCORD_MARKETING_WEBHOOK_URL', 'https://discord.com/api/webhooks/123456/webhook-token');
vi.stubEnv('ATTIO_CLIENT_SECRET', 'some-secret');
vi.stubEnv('ATTIO_API_URL', 'https://test.attio.com/api/v2');
vi.stubEnv('ATTIO_DASHBOARD_URL', 'https://test.attio.com/dashboard');
vi.stubEnv('DELETE_USER_WORKFLOW_ARN', 'some-arn');
vi.stubEnv('WEB3_STORAGE_PRIVATE_KEY', `MgCabeTOY2UA/z7ZI99z0a7KVuAAH09jQGL23v9piA7+RHu0A90HlUizfDnoY2tUogZ9NFsKeLLIA13kgXdMQNL3d/Fk=`);
vi.stubEnv(
  'WEB3_STORAGE_PROOF',
  'XRoeDhkaWQ6a2VkYqDli3waQaWSysdbzE3s6N0AWkYqDli3waQaWSysdbzE3s6N0AWMURfqUP+ddWzzd0ZeSMURfqUP+ddWzzd0ZeS5Ono2TWtrdlU2NkYqDli3waQaWSysdbzE3s6N0AWMURfqUP+ddWzzd0ZeSHEzVUZiTUtHR'
);
vi.stubEnv('REDIS_ENDPOINT_WITH_AUTH', 'redis://localhost:6379');
vi.stubEnv('REDIS_ENDPOINT', 'redis://localhost:6379');
vi.stubEnv('REDIS_TOKEN', 'redis-token');

vi.stubEnv('SDK__IPFS__STORAGE_API_URL', 'ipfs_storage_mock.afsandbox.xyz');
vi.stubEnv('SDK__UPLOAD_PROXY_API_URL', 'upload_proxy_mock.afsandbox.xyz');
