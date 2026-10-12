$env:DB_PASSWORD = (Get-Content .env.development |
  Where-Object { $_ -match '^DB_PASSWORD=' }) -replace '^DB_PASSWORD=', ''

if ($env:DB_PASSWORD) { "DB_PASSWORD is set" }

# rebuild project first before running
.\mvnw.cmd clean compile install

.\mvnw.cmd -pl sbrentms spring-boot:run
