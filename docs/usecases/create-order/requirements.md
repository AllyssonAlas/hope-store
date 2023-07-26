# Create Order Usecase

> ## Case of success
1. System receives **Order** data
2. System checks if user has CREATE_ORDER permission
3. System validates data received
4. System checks if all products exist
5. System checks if all products amount are lesser than stored
6. System checks if address is valid through an API
7. System store data in database
8. System shall return order id, its value and products requested

> ## Exception - Invalid permission
2. System invalidates user permission
3. System returns a forbidden error to the requester

> ## Exception - Missing data
3. System invalidates data
4. System returns a missing data error to the requester

> ## Exception - Invalid data
3. System invalidates data
4. System returns an invalid data error to the requester

> ## Exception - Product is not found
5. System can not find any product with id received
6. System returns an error to the requester

> ## Exception - Insufficient product amount
6. System does find a product with amount stored lesser than request
7. System returns an error to the requester

> ## Exception - Invalid address
7. External address api returns an error with address received
8. System returns an error to the requester

