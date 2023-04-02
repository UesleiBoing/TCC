## Front-End
The frontend listens on port 80. The frontend application contains three pages.
The first page is the login page, where the user can login.

        localhost:80

The second page is the registration page where the user can register in the application by registering a name, email and password. 

        localhost:80/sign-up

The third page is the dashboard which contains several cards from all the articles in the database. 
For performance reasons, the articles are paged, with 12 articles being loaded per page.  
It is possible to filter all results by keywords, category, source and date (all articles posted after that date) [Filter 1].  
It is also possible to customize the user's feed by clicking on the "customize" button, which opens a modal where the user can select 3 favorite authors, 3 favorite categories and 3 favorite sources [Filter 2].  
After saving, all articles listed by Filter 1 must obey Filter 1 and also Filter 2.  
The application also has a menu where it allows the user to logout.

        localhost:80/dashboard

The entire application was developed with the purpose of offering a beautiful responsive interface that caters to all users, from those using computers to those using mobile devices.
