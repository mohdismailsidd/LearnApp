#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 4014

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
#COPY ["learnapp.client/nuget.config", "learnapp.client/"]
COPY ["LearnApp.Server/LearnApp.Server.csproj", "LearnApp.Server/"]
COPY . .
#COPY ["learnapp.client/learnapp.client.esproj", "learnapp.client/"]
RUN dotnet restore "./LearnApp.Server/LearnApp.Server.csproj"
WORKDIR "/src/LearnApp.Server"
RUN dotnet build "./LearnApp.Server.csproj" -c Release -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LearnApp.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build ./Certificates/UserSecrets/* /home/app/.microsoft/usersecrets/
COPY --from=build ./Certificates/Https/* /home/app/.aspnet/https/
ENTRYPOINT ["dotnet", "LearnApp.Server.dll"]