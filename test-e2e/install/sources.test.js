/* @flow */

const helpers = require('../test/helpers.js');

helpers.skipSuiteOnWindows();

describe(`Tests for installations from custom sources`, () => {
  describe('Installation from github', () => {
    async function assertLayoutCorrect(path) {
      await expect(helpers.crawlLayout(path)).resolves.toMatchObject({
        dependencies: {
          'example-yarn-package': {
            name: 'example-yarn-package',
            version: '1.0.0',
          },
          lodash: {
            name: 'lodash',
            version: '4.24.0',
          },
        },
      });
    }

    test('it should install without ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {'example-yarn-package': `yarnpkg/example-yarn-package`},
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('it should install with branch as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {'example-yarn-package': `yarnpkg/example-yarn-package#master`},
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('it should install with 6 char commit sha as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {'example-yarn-package': `yarnpkg/example-yarn-package#0b8f43`},
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('it should install with 9 char commit sha as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `yarnpkg/example-yarn-package#0b8f43f77`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('it should install with 40 char commit sha as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `yarnpkg/example-yarn-package#0b8f43f77361ff7739bcb42de7787b09208bcece`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });
  });

  describe('Installation from git', () => {
    async function assertLayoutCorrect(path) {
      await expect(helpers.crawlLayout(path)).resolves.toMatchObject({
        dependencies: {
          'example-yarn-package': {
            name: 'example-yarn-package',
            version: '1.0.0',
          },
          lodash: {
            name: 'lodash',
            version: '4.24.0',
          },
        },
      });
    }

    test('install from git+https:// with no ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `git+https://github.com/yarnpkg/example-yarn-package.git`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('install from git+https:// with branch as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `git+https://github.com/yarnpkg/example-yarn-package.git#master`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('install from git+https:// with commit sha as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `git+https://github.com/yarnpkg/example-yarn-package.git#0b8f43`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('install from git:// with no ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `git://github.com/yarnpkg/example-yarn-package.git`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('install from git:// with branch as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `git://github.com/yarnpkg/example-yarn-package.git#master`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });

    test('install from git:// with commit as ref', async () => {
      const fixture = [
        helpers.packageJson({
          name: 'root',
          version: '1.0.0',
          dependencies: {
            'example-yarn-package': `git://github.com/yarnpkg/example-yarn-package.git#0b8f43`,
          },
        }),
      ];
      const p = await helpers.createTestSandbox(...fixture);
      await p.defineNpmPackage({
        name: 'lodash',
        version: '4.24.0',
      });
      await p.esy('install');
      await assertLayoutCorrect(p.projectPath);
    });
  });
});
