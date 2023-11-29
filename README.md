# The Wild Oasis

The Wild Oasis is a hotel management application that allows employees to keep track of bookings, stays and available cabins. 

A tech stack of React Router, Styled Components, React Query and React Hook Form was used to ease up the development process, allowing global remote state to be easily managed. For the backend, I used Supabase, which is a Postgres database that can be up and running with little to no work. Supabase also creates a RESTful API, reducing your workload.

## Installation

Clone repo
`https://github.com/asiyahzaheem/the-wild-oasis.git
`

Install dependencies
`npm install`

Live server
`npm run dev`

Build command
`npm run build`

## Using The Wild Oasis

**Credentials**

email: `test@example.com`

password: `qwerty123`

You are first greeted with a [dashboard](https://the-wild-oasis-asiyah.vercel.app/dashboard) page, detailing important statistics such as the number of bookings and sales. You can view the check-ins and check-outs that are scheduled for today. The pie and line chart, displayed using Recharts, show the frequency of stay durations and sales. You can also adjust the information based on the last 7, 30 or 90 days. 

The [bookings](https://the-wild-oasis-asiyah.vercel.app/bookings) page displays all bookings, ordered defaultly by recent first. You can add, delete or view bookings. For unconfirmed bookings, you can check them in, adding breakfast optionally. If a guest is currently checked-in, you can check them out whenever needed.

The [cabins](https://the-wild-oasis-asiyah.vercel.app/cabins) page displays a list of the available cabins, which can be duplicated, edited or deleted. You can also add new cabins. 

Since this application is specifically for hotel management, only hotel employees can create new users in the [users](https://the-wild-oasis-asiyah.vercel.app/users) page. Submitting the form will send a verification mail to the specified email address. Once verified, the new user can log in!

Lastly, the [settings](https://the-wild-oasis-asiyah.vercel.app/settings) page allows users to update hotel settings, such as breakfast prices and maximum guests per booking. 

## Credits
This project was built as part of the [React course](https://www.udemy.com/course/the-ultimate-react-course/) by Jonas Schmedtmann. Special thanks to Jonas for his exceptional teaching methods and effort, it does not go unrecognised!
