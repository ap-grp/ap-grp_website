param(
  [string]$ProjectRoot = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$resolvedRoot = (Resolve-Path -LiteralPath $ProjectRoot).Path
$packageRoot = (Resolve-Path -LiteralPath (Join-Path $resolvedRoot 'docs\.manual-build\docx-package')).Path
$docxPath = [System.IO.Path]::GetFullPath((Join-Path $resolvedRoot 'docs\Website_Editing_and_Publishing_Manual.docx'))

if (-not $packageRoot.StartsWith($resolvedRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Package source is outside the project workspace: $packageRoot"
}
if (-not $docxPath.StartsWith($resolvedRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "DOCX target is outside the project workspace: $docxPath"
}

$requiredParts = @(
  '[Content_Types].xml',
  '_rels\.rels',
  'word\document.xml',
  'word\styles.xml',
  'word\_rels\document.xml.rels'
)
foreach ($requiredPart in $requiredParts) {
  if (-not (Test-Path -LiteralPath (Join-Path $packageRoot $requiredPart))) {
    throw "Required DOCX part is missing: $requiredPart"
  }
}

$outputStream = [System.IO.File]::Open($docxPath, [System.IO.FileMode]::Create, [System.IO.FileAccess]::ReadWrite, [System.IO.FileShare]::None)
try {
  $archive = New-Object System.IO.Compression.ZipArchive($outputStream, [System.IO.Compression.ZipArchiveMode]::Create, $false)
  try {
    $sourceFiles = Get-ChildItem -LiteralPath $packageRoot -Recurse -File | Sort-Object FullName
    foreach ($sourceFile in $sourceFiles) {
      $entryName = $sourceFile.FullName.Substring($packageRoot.Length + 1).Replace('\', '/')
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $archive,
        $sourceFile.FullName,
        $entryName,
        [System.IO.Compression.CompressionLevel]::Optimal
      ) | Out-Null
    }
  }
  finally {
    $archive.Dispose()
  }
}
finally {
  $outputStream.Dispose()
}

Write-Output "DOCX=$docxPath"
