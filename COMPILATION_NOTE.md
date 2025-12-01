# LaTeX Compilation Note

## PDF Compilation Instructions

The LaTeX report (`filled_report.tex`) requires pdflatex to compile to PDF. Since pdflatex is not currently installed on this system, please follow these steps to compile:

### Option 1: Install LaTeX Distribution

**macOS:**
```bash
brew install --cask mactex
# or for a smaller installation:
brew install --cask basictex
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install texlive-full
# or for a smaller installation:
sudo apt-get install texlive-latex-base texlive-latex-extra
```

**Windows:**
Download and install MiKTeX or TeX Live from:
- MiKTeX: https://miktex.org/download
- TeX Live: https://www.tug.org/texlive/

### Option 2: Use Online LaTeX Compiler

You can use online LaTeX compilers such as:
- Overleaf: https://www.overleaf.com/
- ShareLaTeX: https://www.sharelatex.com/

Simply upload `filled_report.tex` and `references.bib` to compile.

### Compilation Command

Once LaTeX is installed, run:

```bash
cd /Users/revanthguthula/Desktop/GharKaKhana_redesign
pdflatex filled_report.tex
bibtex filled_report
pdflatex filled_report.tex
pdflatex filled_report.tex
```

Or use a single command that handles everything:

```bash
latexmk -pdf filled_report.tex
```

### Required Files

Make sure these files are in the same directory:
- `filled_report.tex` - Main LaTeX document
- `references.bib` - Bibliography file

### Missing Files Note

The following files are referenced in the LaTeX document but were not found in the repository:
- `/resume.pdf` - To be added in Appendix B
- `/offer_letter.jpg` - To be added in Appendix A

Please add these files before final compilation, or comment out the appendix sections if not available.




