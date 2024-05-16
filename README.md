# Curve Area Estimator

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Created using [mathjs](https://mathjs.org/)

Have you been through Calculus? Have you had to struggle with the overwhelmingly simple yet agonizingly tedious task of estimating the area under a curve using rectangles?

Oh, you have had this hyper specific problem?

Then this is the app for you!

Introducing the Curve Area Estimator! Using this ingenious website, you can solve your area estimates in record time!

All you need is the equation, domain, and number of rectangles to estimate. 

Press the "Estimate" button after you have entered your information and you will recieve the upper, lower, and midpoint estimations!

All of course in fractions for ease of use and to mimic human mathematical practices!

Visit the site **[here](https://stupidrectangles.netlify.app/)**!

# Install

``` cmd
## After cloning

cd curve-area-estimator
npm i
npm run dev
```

# Syntax for Inputs

## Equation

The equation input uses calculator like syntax.

```
## Exponents
y=x^2

## Division

y=x/2

## Muliplication

y=x*2 or y=2x
```

## Domain

The domain input takes interval notation. 

The lower bound should be entered first, then a comma, and then the upper bound should follow. 

The entire interval should be surrounded by square brackets [].

It will only calculate closed intervals and it will not skip entries if there is a restriction on the domain.

```
## Domain

## No fractions

[-1,1]

## Fractions

[-1/3,5]
```

## Number of Rectangles

The number of rectanlges input takes a whole number.

It may be able to take a fraction but estimating using one and a half rectangles doesn't make much sense.

# FAQs

**How do I type my equation into the site?**

This site uses syntax similar to a calculator to take in equations. 

If we wanted to estimate the area under the graph of X squared we would type:

```
y=x^2
```

**I have fractions in my domain. Will the site accept that?**

Yes! Have no worries that this site is capable of handling fractions anywhere. 

Except maybe the number of rectangles, but, it doesn't really make sense to have a fraction there.

**Does my father still care and love me?**

If you use my app to save time on your math homework you can ask him yourself!
