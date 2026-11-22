import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['node_modules/', 'playwright-report/', 'test-results/']),
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: globals.node,
        },
    },
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**/*.ts'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            //my assertions live in the page objects so this rule says count these methods as assertions
            'playwright/expect-expect': [
                'warn',
                {
                    assertFunctionNames: [
                        'assertPageHeadingText',
                        'assertPageHeadingContainsText',
                        'assertTextContains',
                        'assertSummaryText',
                        'assertErrorMessageVisible',
                        'elementIsVisible',
                        'elementIsFocused',
                        'selectWorksIrregularHours',
                    ],
                },
            ],
        },
    },
    prettier,
]);
