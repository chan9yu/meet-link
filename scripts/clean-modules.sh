#!/bin/sh

echo "\033[32m" clean node_modules start ⏳ "\033[m"
find . -name "node_modules" -print -type d -depth -exec rm -rf {} \;
echo "\033[32m"clean node_modules end ⌛️"\033[m"