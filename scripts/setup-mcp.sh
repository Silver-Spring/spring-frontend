#!/bin/bash

# Setup Script for Next.js DevTools MCP Server
# This script configures MCP support for GitHub Copilot and other AI coding assistants

set -e  # Exit on error

echo "🚀 Setting up Next.js DevTools MCP Server..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20.9+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js 20.9+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm version: $(npm -v)"

echo ""
print_info "Installing next-devtools-mcp globally..."

# Install next-devtools-mcp globally
if npm install -g next-devtools-mcp@latest; then
    print_success "next-devtools-mcp installed globally"
else
    print_error "Failed to install next-devtools-mcp"
    exit 1
fi

echo ""
print_info "Checking installation..."

# Verify installation
if command -v next-devtools-mcp &> /dev/null; then
    print_success "next-devtools-mcp is available globally"
    print_info "Installed at: $(which next-devtools-mcp)"
else
    print_warning "next-devtools-mcp command not found in PATH"
    print_info "You may need to add npm global bin to your PATH"
fi

echo ""
print_success "MCP Server installation complete!"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Configure GitHub Copilot to use MCP:"
echo "   - The .mcp.json file has been created in the project root"
echo "   - GitHub Copilot will automatically discover it"
echo ""
echo "2. Start your Next.js development server:"
echo "   $ pnpm dev"
echo ""
echo "3. The MCP server will automatically connect to your Next.js app"
echo ""
echo "4. Try these prompts in GitHub Copilot Chat:"
echo "   • 'Next Devtools, what errors are in my app?'"
echo "   • 'Next Devtools, help me upgrade to Next.js 16'"
echo "   • 'Next Devtools, show me the current routes'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_success "Setup complete! 🎉"
echo ""
