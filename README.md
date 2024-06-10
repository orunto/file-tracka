# Softdrobe App
The prototype codebase for the BIT org tool

## Stack
This is a nextjs project bootstrapped with create-next-app but with the pnpm package manager. To get started clone the repo and install node modules using pnpm. Trust me it's just better that way 😉

``` 
git clone https://github.com/orunto/file-tracka.git
```

```
pnpm install
```

- Styling is done with a combination of SASS and [`Tailwindcss`](https://v2.tailwindcss.com/docs/).

- Animation with the [`Animejs`](https://animejs.com/documentation/) and the [`AOS Library`](https://github.com/michalsnik/aos/) for simple scroll transitions

- The site makes use of a in-app APIs, all documented below.

## Structure
```
├───components
│   ├───atoms
│   ├───molecules
│   ├───compounds
│   └───mixtures   
├───lib
├───pages
├───prisma
├───public
└───styles
```

- Atom components are single function uncomplicated components like buttons 
- Molecules are more complex and contain two or more atom components e.g Navbars
- Compounds contain multiple molecule and atom components e.g Modal popups
- Mixtures contain multiple compounds, molecule and atom components e.g Dashboards

## Utitlity Packages
- [`Notiflix`](https://notiflix.github.io/) for popup notifications and loading screens
- [`Push`](https://pushjs.org/#) for external notifications

## Functionality
The app has seven core dashboard formats
### QSS
- Can input files into the system (Sends an e-receipt to the other party immediately to acknowledge)
- 