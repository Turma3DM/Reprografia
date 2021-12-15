<a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/README-en.md">Go Back</a>

<a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/business_rules/README.md">Portuguese Version</a>

## Business rules:

- A user can only request a copy if he is authenticated (logged in).
- Only a user identified as ADMIN can register users.
- Users who are not ADMIN can only view the reproductions made by their own account.
- All users (either ADMIN or Normal user) can only evaluate orders placed by their own account.
- All services have pre-established quantities and when they reach 0, it will not be possible to request the reprography that contains that service (example: A3 & Black and White).
- Only users with different NIFS and E-mails will be registered.
- Only files whose extension is an image (.jpeg, .jpg, .png...) can be uploaded to the user profile image. And for the attachment, only files like: .PDF, .DOCX and .XLSX will be accepted.
- You need two Services from the "services" table to place an order. And it is also necessary that neither of these two services have their quantity exhausted ( <= 0).
- An order can only be placed if the multiplication of the number of copies with the number of pages entered by the user is smaller (<) than the quantity of the two services.
- An order can only be evaluated if it exists and has not yet been evaluated.
- A user can only login if they have their account activated.
- Every user on their first access needs to enter a new password for their account, updating the system default password for users created by management (senai115).


___

#### USER:

He can:

- Log into;
- Request a new password if you have forgotten it (it will be sent by email);
- View your information (User profile);
- Update your information (only name, email, phone and your profile picture);
- Update your password (entering your old and new passwords);
- Request a reprography (the request will be sent to the responsible company with all the choices made by this user);
- View all your reprographic requests/requests;
- Send a FeedBack about the reprography you requested (it will include whether Answered or Not Answered and your observations);
- Disable your account.


____

#### Manager/ADMIN

He can:

... All user permissions

 _+_

- Register Users;
- View all users;
- View any other user by Name, NIF...;
- Update any other user by NIF;
- Activate or deactivate a user;
- View all Orders;
- View all orders by order id, order title, by the nif of the user who requested the order...;
- Create a Service;
- View all services;
- Update a service;
- Activate or deactivate a Service.
