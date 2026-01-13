#!/bin/bash

# Verification Script for Next.js DevTools MCP Server
# Checks if MCP is properly configured and available

set -e

echo "🔍 Verifying MCP Server Configuration..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if .mcp.json exists
if [ -f ".mcp.json" ]; then
    print_success ".mcp.json configuration file exists"
else
    print_error ".mcp.json not found. Run setup-mcp.sh first."
    exit 1
fi

# Check if next-devtools-mcp is installed globally
if command -v next-devtools-mcp &> /dev/null; then
    print_success "next-devtools-mcp is installed globally"
    echo "   Location: $(which next-devtools-mcp)"
else
    print_warning "next-devtools-mcp not found in global PATH"
    echo "   This is OK - npx will download it on demand"
fi

# Check if npx is available
if command -v npx &> /dev/null; then
    print_success "npx is available"
else
    print_error "npx is not available. Please install Node.js 20.9+"
    exit 1
fi

# Check Next.js version
if [ -f "package.json" ]; then
    NEXT_VERSION=$(node -e "console.log(require('./package.json').dependencies.next)" 2>/dev/null || echo "unknown")
    if [ "$NEXT_VERSION" != "unknown" ]; then
        print_success "Next.js version: $NEXT_VERSION"
        
        # Extract major version
        MAJOR_VERSION=$(echo $NEXT_VERSION | grep -oE '[0-9]+' | head -1)
        if [ "$MAJOR_VERSION" -ge 16 ]; then
            print_success "Next.js 16+ detected - MCP support is available"
        else
            print_warning "Next.js $MAJOR_VERSION detected - upgrade to 16+ for full MCP support"
        fi
    fi
else
    print_error "package.json not found"
    exit 1
fi

# Check if dev server is running
if curl -s http://localhost:3000/_next/mcp > /dev/null 2>&1; then
    print_success "Next.js dev server is running with MCP endpoint"
    echo "   MCP endpoint: http://localhost:3000/_next/mcp"
else
    print_warning "Next.js dev server not running"
    echo "   Start it with: pnpm dev"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "MCP Configuration Verified!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  1. Start dev server: pnpm dev"
echo "  2. Open GitHub Copilot Chat"
echo "  3. Try: 'Next Devtools, what errors are in my app?'"
echo ""
