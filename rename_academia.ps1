$dir = "c:\Users\Tahioss\Downloads\Visual Creativa\img\academia"
# Renombrar fotos de galería
1..20 | ForEach-Object {
    $old = "$dir\$($_.ToString('00')).jpg"
    $new = "clase-oratoria-$($_.ToString('00')).jpg"
    if (Test-Path $old) { Rename-Item -Path $old -NewName $new }
}

# Renombrar profesor
if (Test-Path "$dir\prof-1.jpg") { Rename-Item -Path "$dir\prof-1.jpg" -NewName "david-huallanca-coach.jpg" }
