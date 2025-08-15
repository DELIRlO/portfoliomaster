@echo off
setlocal enabledelayedexpansion

:main
set /p confirm="Confirmar git add/commit/push? (s/n): "
if "%confirm%"=="s" (
    echo.
    echo Executando git add...
    git add .
    if !errorlevel! neq 0 (
        echo Erro no git add. Verificando se é um repositório git...
        call :check_git_repo
        goto main
    )
    
    echo.
    echo Executando git commit...
    git commit -m ":white_check_mark: :bug: :rocket: :alien: :robot: vai estabiliza otum"
    if !errorlevel! neq 0 (
        echo Erro no git commit.
        pause
        goto main
    )
    
    echo.
    echo Executando git push...
    call :git_push_with_credentials
    if !errorlevel! neq 0 (
        echo Erro no git push. Tentando git pull primeiro...
        git pull origin main
        if !errorlevel! neq 0 (
            echo Erro no git pull. Verificando configuração do repositório...
            call :check_git_repo
            goto main
        )
        echo git pull realizado com sucesso. Tentando push novamente...
        call :git_push_with_credentials
        if !errorlevel! neq 0 (
            echo Erro persistente no git push.
            pause
            goto main
        )
    )
    
    echo.
    echo Operações concluídas com sucesso!
)
pause
exit /b

:check_git_repo
echo Verificando se é um repositório git...
git status >nul 2>&1
if !errorlevel! neq 0 (
    echo Não é um repositório git. Inicializando...
    git init
    if !errorlevel! neq 0 (
        echo Erro ao inicializar repositório git.
        pause
        exit /b
    )
    echo Configurando repositório remoto...
    set /p remote_url="Informe a URL do repositório remoto: "
    
    :: Modifique a URL para incluir suas credenciais
    set "remote_url=!remote_url:https://=https://Yxk441631%40github.com:Yxk441631@!"
    
    git remote add origin "!remote_url!"
    if !errorlevel! neq 0 (
        echo Erro ao configurar repositório remoto.
        pause
        exit /b
    )
)
echo Fazendo pull do repositório...
git pull origin main
if !errorlevel! neq 0 (
    echo Erro ao fazer pull. Pode ser o primeiro commit.
    git branch -M main
)
exit /b

:git_push_with_credentials
:: Verifica se já existe um remote configurado
git remote get-url origin >nul 2>&1
if !errorlevel! equ 0 (
    :: Obtém a URL atual
    for /f "delims=" %%a in ('git remote get-url origin') do set "current_url=%%a"
    
    :: Se não contiver credenciais, adiciona
    echo !current_url! | findstr /i /c:"Yxk441631@" >nul
    if !errorlevel! neq 0 (
        set "new_url=!current_url:https://=https://Yxk441631%40github.com:Yxk441631@!"
        git remote set-url origin "!new_url!"
    )
)

:: Executa o push
git push origin main
exit /b