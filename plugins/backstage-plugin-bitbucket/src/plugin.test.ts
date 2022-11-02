import { bitbucketPlugin } from './plugin';

describe('backstage-plugin-bitbucket', () => {
  it('should export plugin', () => {
    expect(bitbucketPlugin).toBeDefined();
  });
});
