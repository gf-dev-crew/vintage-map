import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  // 빌드 결과물 및 불필요한 디렉토리는 ESLint 검사에서 제외
  { ignores: ['dist', 'node_modules', 'styled-to-css-object.js'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ESLint 설정 파일 자체를 위한 설정
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 일반 프로젝트 파일(**/*.{ts,tsx})을 위한 설정
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
      },
      parserOptions: {
        // 현재 ESLint 설정 파일이 위치한 디렉토리를 기준으로 tsconfig.json 파일을 찾도록 지정
        // 이 설정은 TypeScript ESLint 플러그인이 타입 정보를 올바르게 읽어들이기 위해 필요
        tsconfigRootDir: __dirname,
        // JSX 문법 지원 활성화
        // React 및 유사 라이브러리에서 JSX를 사용하려면 반드시 설정 필요
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      // React 관련 규칙 플러그인
      react,
      // React Hooks 규칙 플러그인
      'react-hooks': reactHooks,
      // 개발 중 핫 리로드를 위한 React Fast Refresh 규칙 플러그인
      'react-refresh': reactRefresh,
      // Prettier와 ESLint 연동 플러그인
      prettier,
      // import 관련 추가 플러그인
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      // React Fast Refresh: 컴포넌트 이외의 export 허용 옵션
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      // 값이 재할당되지 않는 변수에 대해 "let" 대신 "const"를 사용하도록 경고
      'prefer-const': 'warn',
      // eslint-plugin-prettier와 충돌하는 ESLint core 규칙 비활성화
      'prefer-arrow-callback': 'off',
      // DOM에 정의되지 않은 속성 사용 체크 비활성화
      'react/no-unknown-property': 'off',
      // 정의한 props에 대한 prop-types 체크 비활성화
      'react/prop-types': 'off',
      // React Hooks 의존성 배열 규칙 경고
      'react-hooks/exhaustive-deps': 'warn',
      // TypeScript에서 'any' 타입의 명시적 사용 허용
      '@typescript-eslint/no-explicit-any': 'off',
      // require 사용 허용
      '@typescript-eslint/no-var-requires': 'off',
      // 미사용 변수 경고: 단, 변수명이 _로 시작하는 경우는 무시
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // production 환경에서 console/debugger 사용 제한
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // 네이밍 컨벤션 규칙
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        // 기존 함수, 타입 규칙은 유지
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],
      // 컴포넌트 네이밍 시 PascalCase 준수
      'react/jsx-pascal-case': ['warn', { allowAllCaps: false, ignore: [] }],

      // ▶ import 정렬 자동화
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              // 리액트 관련 패키지
              '^react',
              // node 모듈 및 모든 라이브러리
              '^@?\\w',
              // 상대 경로 import
              '^\\.\\.\\/.*',
              '^\\.\\/.*',
            ],
          ],
        },
      ],
    },
  }
);
