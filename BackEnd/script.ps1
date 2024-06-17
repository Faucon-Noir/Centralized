param (
    [string]$original_path = "C:/ETNA/Centralized/BackEnd"
)

# Liste des dossiers
$directories = "Planning"#, "Project", "Rex", "Specification", "Team", "Ticket", "User"

# Commande à exécuter
$command_to_run = "npx typeorm init --name {0} --database mysql2"

# Les différents paths
# $original_path = "C:/ETNA/Centralized/BackEnd"
$base_path = "$original_path/src/Services"

# Installation des dépendances
$dependency_path = "$original_path/src/shared"
Set-Location -Path $dependency_path
Invoke-Expression "yarn install -y"

Set-Location -Path $original_path

# Créer le dossier Services s'il n'existe pas
if (!(Test-Path -Path $base_path)) {
    New-Item -Path $base_path -ItemType Directory
}
else {
    Get-ChildItem -Path $base_path -Recurse | Remove-Item -Force -Recurse
}

# Initialiser les services
foreach ($dir in $directories) {
    if (Test-Path -Path $base_path) {
        Write-Host "Running command for $dir" -ForegroundColor Yellow
        $project_name = $dir + "Service"
        $service_path = "$base_path/$project_name"
        
        try {
            Set-Location -Path $base_path
            Invoke-Expression ($command_to_run -f $project_name)
            
            # Effacement des fichiers non désirés
            Write-Host "Erasing $project_name useless files..." -ForegroundColor Yellow
            Remove-Item -Path "$service_path/src/entity" -Force -Recurse
            Remove-Item -Path "$service_path/src/migration" -Force
            Remove-Item -Path "$service_path/src/data-source.ts" -Force
            Remove-Item -Path "$service_path/.gitignore" -Force
            Remove-Item -Path "$service_path/package-lock.json" -Force
            
            # réinstallation des dépendances
            Write-Host "Installing $project_name dependencies..." -ForegroundColor Blue
            Set-Location -Path "$service_path"
            Invoke-Expression "yarn install -y"
            Invoke-Expression "yarn add bcrypt routing-controllers express-session express body-parser cors swagger-ui-express swagger-jsdoc multer path jsonwebtoken axios class-validator -y"
            
            # Index
            Write-Host "Generating $project_name Index" -ForegroundColor Magenta
            Set-Location -Path "$original_path"
            $index_source = "./src/shared/gen/index.txt"
            $index_dest = "$service_path/src/index.ts"
            if (!(Test-Path -Path (Split-Path -Path $index_dest -Parent))) {
                New-Item -Path (Split-Path -Path $index_dest -Parent) -ItemType Directory
            }
            Copy-Item -Path $index_source -Destination $index_dest
            
            # Controller
            Write-Host "Generating $project_name Controller" -ForegroundColor Magenta
            Set-Location -Path "$original_path"
            $controller_source = "./src/shared/gen/controller/$($dir).txt"
            $controller_dest = "$service_path/src/Controller/$($dir)Controller.ts"
            if (!(Test-Path -Path (Split-Path -Path $controller_dest -Parent))) {
                New-Item -Path (Split-Path -Path $controller_dest -Parent) -ItemType Directory
            }
            Copy-Item -Path $controller_source -Destination $controller_dest
            Write-Host
            Write-Host
            Write-Host "Directory $project_name generated successfully" -ForegroundColor Green
        }
        finally {
            # Revenir au dossier parent
            Set-Location -Path $original_path
        }
    }
    else {
        Write-Host "Directory $dir does not exist. Skipping." -ForegroundColor Red
    }
}

# Afficher le message "Jobs completed"
Write-Host "Jobs Completed" -ForegroundColor White

Set-Location -Path $original_path