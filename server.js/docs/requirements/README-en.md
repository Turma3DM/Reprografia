<div>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/README-en.md">Go Back</a></p>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/requirements/README.md">Portuguese Version</a></p>
</div>

<h3 align="center">📌 Functional Requirements</h3>

<table>
  <tr align="center">
    <th>#</th>
    <th>Requirement</th>
    <th>Description</th>
    <th>Type</th>
    <th>Priority</th>
  </tr>
  <tr align="center">
    <td>1</td>
    <td align="left">User Management</td>
    <td align="left">Administrator users of the application must be able to register, update and delete other users.</td>
    <td>Functional</td>
    <td>Required</td>
  </tr>
  <tr align="left">
    <td>2</td>
    <td align="left">Login</td>
    <td align="left">After users have a record with all necessary information, they are able to log in and out of the application.</td>
    <td>Functional</td>
    <td>Required</td>
  </tr>
    <td>3</td>
     <td align="left">User Information</td>
    <td align="left">After the registration is done correctly, users can view and edit their own information.</td>
    <td>Functional</td>
    <td>Important</td>
  </tr>
  </tr>
  <td>4</td>
    <td align="left">Print Requests</td>
    <td align="left">The system must register all orders (requests) made by users, where all orders will be evaluated by administrator users.</td>
    <td>Functional</td>
    <td>Required</td>
  </tr>
  </tr>
    <td>5</td>
    <td align="left">History of Requests</td>
    <td align="left">Users will have a history of their own requests made so far.</td>
    <td>Functional</td>
    <td>Important</td>
  </tr>
  </tr>
    <td>6</td>
    <td align="left">Services/Orders Management</td>
    <td align="left">Internal services provided by the contracted company can be registered, changed and deleted.</td>
    <td>Functional</td>
    <td>Required</td>
  </tr>
  </tr>
    <td>7</td>
    <td align="left">Sending Emails</td>
    <td align="left">For certain features, such as password recovery, placing an order and feedbacks, an email will be sent to the user/company hired, with certain information about the function used.</td>
    <td>Functional</td>
    <td>Important</td>
  </tr>
</table>

<br><br> <h3 align="center">📌 Requisitos Não Funcionais</h3>

<table>
  <tr align="center">
    <th>#</th>
    <th>Requirement</th>
    <th>Description</th>
    <th>Type</th>
    <th>Priority</th>
  </tr>
  <tr align="center">
   <tr>
    <td>1</td>
    <td align="left">System Availability</td>
    <td align="left">The system must have an availability greater than 98.05% guaranteed</td>
    <td>Not Functional</td>
    <td>Required</td>
  </tr>
   <tr>
    <td>2</td>
    <td align="left">Multiplatform system</td>
    <td align="left">System compatibility and all its functionality must be compatible on other systems, such as Linux and MacOS.</td>
    <td>Not Functional</td>
    <td>Important</td>
  </tr>
  <tr>
    <td>3</td>
    <td align="left">Routes</td>
    <td align="left">The routes must be authenticated and safe for the user's navigation during the period of use of the application.</td>
   <td>Not Functional</td>
    <td>Required</td>
  </tr>
   <tr>
    <td>4</td>
    <td align="left">Passwords</td>
    <td align="left">All passwords must be encrypted by the system and database.</td>
    <td>Not Functional</td>
    <td>Required</td>
  </tr>
  </tr>
    <td>5</td>
    <td align="left">Login</td>
    <td align="left">It is only possible to login if the user is authenticated in the database.</td>
    <td>Not Functional</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>6</td>
    <td align="left">Login (Recovery)</td>
    <td align="left">If the user forgets their password, it is possible to recover it through the email sent for recovery.</td>
    <td>Not Functional</td>
    <td>Important</td>
    </tr>
    <tr>
    <td>7</td>
    <td align="left">Services</td>
    <td align="left">All services must be delimited, not exceeding the limit provided by the contracted company.</td>
   <td>Not Functional</td>
    <td>Required</td>
  </tr>
    <tr>
</table>
