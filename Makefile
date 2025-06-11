# Minimal makefile for Sphinx documentation (multi-language build)

SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = source/docs
BUILDDIR      = build/html

LANGS = en de fr es nl tr

.PHONY: help clean all $(LANGS)

help:
	@echo "Usage:"
	@echo "  make all      # build all languages"
	@echo "  make <lang>   # build a specific language"
	@echo "  make clean    # clean build directory"

clean:
	rm -rf $(BUILDDIR)/*

all: $(LANGS)

$(LANGS):
	@echo "Building language: $@"
	$(SPHINXBUILD) -b html $(SOURCEDIR)/$@ $(BUILDDIR)/$@ $(SPHINXOPTS)
