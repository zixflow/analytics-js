#!/bin/bash

# Publishing script for @zixflow/analytics-next

set -e

echo "🚀 Starting package publishing process..."

# Check if we're on master branch
if [[ $(git branch --show-current) != "master" ]]; then
    echo "❌ Error: Must be on master branch to publish"
    echo "Current branch: $(git branch --show-current)"
    exit 1
fi

# Check if working directory is clean
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ Error: Working directory is not clean. Please commit all changes first."
    exit 1
fi

# Check if logged into npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Error: Not logged into npm. Please run 'npm login' first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the package
echo "🔨 Building package..."
npm run build:clean

# Test the build
echo "🧪 Testing build..."
npm run test:build

# Check if dist folder exists and has content
if [[ ! -d "dist" ]] || [[ -z "$(ls -A dist)" ]]; then
    echo "❌ Error: Build failed - dist folder is empty or missing"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📋 Current version: $CURRENT_VERSION"

# Ask for version bump type
echo "📈 Select version bump type:"
echo "1) patch (0.0.x)"
echo "2) minor (0.x.0)"
echo "3) major (x.0.0)"
echo "4) custom"
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        npm version patch --no-git-tag-version
        ;;
    2)
        npm version minor --no-git-tag-version
        ;;
    3)
        npm version major --no-git-tag-version
        ;;
    4)
        read -p "Enter custom version (e.g., 1.2.3): " custom_version
        npm version $custom_version --no-git-tag-version
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "📋 New version: $NEW_VERSION"

# Build again with new version
echo "🔨 Rebuilding with new version..."
npm run build:clean

# Publish to npm
echo "📤 Publishing to npm..."
npm publish

# Create git tag
echo "🏷️ Creating git tag..."
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"
git tag "v$NEW_VERSION"
git push origin master
git push origin "v$NEW_VERSION"

echo "✅ Successfully published @zixflow/analytics-next@$NEW_VERSION"
echo "🎉 Package is now available on npm!" 