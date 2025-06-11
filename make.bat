@ECHO OFF

pushd %~dp0

REM Command file for Sphinx documentation (multi-language build)

if "%SPHINXBUILD%" == "" (
	set SPHINXBUILD=sphinx-build
)
set SOURCEDIR=source\docs
set BUILDDIR=build\html

%SPHINXBUILD% >NUL 2>NUL
if errorlevel 9009 (
	echo.
	echo.The 'sphinx-build' command was not found. Make sure you have Sphinx
	echo.installed, then set the SPHINXBUILD environment variable to point
	echo.to the full path of the 'sphinx-build' executable. Alternatively you
	echo.may add the Sphinx directory to PATH.
	echo.
	echo.If you don't have Sphinx installed, grab it from
	echo.https://www.sphinx-doc.org/
	exit /b 1
)

if "%1" == "" goto help

if /I "%1"=="all" (
	for %%L in (en de fr es nl tr) do (
		echo Building language: %%L
		%SPHINXBUILD% -b html %SOURCEDIR%\%%L %BUILDDIR%\%%L %SPHINXOPTS%
	)
	goto end
)

REM Build specific language
%SPHINXBUILD% -b html %SOURCEDIR%\%1 %BUILDDIR%\%1 %SPHINXOPTS%
goto end

:help
echo Usage:
echo   make.bat all     Build all languages
echo   make.bat <lang>  Build specific language (e.g. en, de, fr)
goto end

:end
popd

