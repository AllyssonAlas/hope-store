# Create Admin User Usecase

> ## Case of success
1. System receives **User** data
2. System validates data received
3. System shall encrypt user password
4. System stores data, including encrypted password, in the database

> ## Exception - Missing data
2. System invalidates data
3. System returns a missing data error to the requester

> ## Exception - Invalid data
2. System invalidates data
3. System returns a invalid data error to the requester
