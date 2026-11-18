@echo off
title Fine - comercial (teste local)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ferramentas\servidor.ps1" -Pasta comercial -Porta 8081
