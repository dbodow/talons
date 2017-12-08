# Talons: A predator-prey dynamics simulator

## Table of Contents
  * [Background and Overview](#background-and-overview)
  * [Setting Parameters](#setting-parameters)
  * [Frontend](#frontend)
    * Panoramic Scrolling
    * Population Graphing
  * [Backend](#backend)
    * Physics Simulation
    * Object-Oriented Practices

## Background and Overview
Predator-prey dynamics is a [complex area of study](https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations) in ecosystems biology. However, [existing tools](https://www.google.com/search?channel=fs&q=predator+prey+simulation&ie=utf-8&oe=utf-8) for simulating these phenomena tend to be [highly abstract](http://www.phschool.com/atschool/phbio/active_art/predator_prey_simulation/) or [outdated and visually unappealing](http://www.shodor.org/interactivate/activities/RabbitsAndWolves/). Furthermore, these models endogenize important fitness factors in determining reproduction and survivorship into black-box categories such as 'predator effectiveness' or 'prey birthrate'.  

**Talons** aims to create a predator-prey simulation that is more visually appealing and accessible to less technical users. Users will generate a model ecosystem consisting of predators (eagles) and prey (sparrows). By selecting adaptive characteristics of both predators' and prey's offspring, users can visualize the effects of fitness on population dynamics by controlling predator & prey traits. For example, the user can choose to increase the predators' speed at the cost of lowering their energy efficiency. Users can then observe the population dynamics both in real-time as predators and prey interact on screen, and also view charts of the population dynamics to evaluate data more formally.

Predators will move towards prey based on an inverse-square distance relationship. Prey will run from predators based on a similar inverse-square distance relationship.

## Setting Parameters

Users can specify parameters that determine predators' and prey's fitness levels by moving sliders below the panorama. By controlling the relative fitness of predators and prey, users can examine different ecosystem dynamics. For example, launching simulations with highly fit predators and overly-numerous prey tends to spike and then crash predator populations, while balancing relative fitness tends toward a more stable state.

Parameters adjust fitness as follows:
* Predators
  * Speed: faster movement allows predators to more easily catch prey
  * Perception: higher perception favors chasing prey over continuing momentum in a single direction when updating predators' movement vectors
  * Efficiency: higher efficiency increases the time predators can survive without eating before starvation
  * Reproduction Time: faster reproduction allows the predator population to grow at a faster rate

* Prey
  * Speed: faster movement allows prey to run more quickly from nearby predators
  * Camouflage: reduces each prey's 'gravitational field' strength in physics modeling, impeding predators ability to detect and react to prey movement
  * Ecosystem Capacity: sets a maximum limit on prey populations before mass starvation
  * Reproduction Time: faster reproduction allows the prey population to grow at a faster rate

## Frontend

### Panoramic scrolling

### Population Graphing

## Backend

### Physics Simulation

### Object Oriented Practices
