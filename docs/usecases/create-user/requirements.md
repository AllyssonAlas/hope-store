# Create Admin User Usecase

> ## Case of success
1. System receives **User** data
2. System validates data received
3. System checks if email does not exist
4. System encrypts user password
5. System stores data, including encrypted password, in the database

> ## Exception - Missing data
2. System invalidates data
3. System returns a missing data error to the requester

> ## Exception - Invalid data
2. System invalidates data
3. System returns an invalid data error to the requester

> ## Exception - Invalid data
3. System finds an account with email received
4. System returns an unauthorized error to the requester
