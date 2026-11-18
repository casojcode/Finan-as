@echo off
title Fine - pessoal (teste local)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ferramentas\servidor.ps1" -Pasta pessoal -Porta 8080
