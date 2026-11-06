---
title: Making AI pay back in operations, not in pilots
description: Most operations AI never leaves the pilot stage. The few use cases that pay back share a set of traits that have little to do with the model itself.
date: 2026-05-19
type: articles
authors:
  - marcus-lindqvist
  - kenji-watanabe
cover: ./cover.jpg
coverAlt: "Aerial view of a container terminal with stacked shipping containers"
coverCredit:
  name: "CHUTTERSNAP"
  url: https://unsplash.com/photos/9cCeS9Sg6nU
industries:
  - energy-utilities
  - industrials
services:
  - digital-ai
  - operations-performance
featured: true
---

Almost every operations leader we meet can list a dozen AI pilots: a predictive maintenance model for pumps, a demand forecast for spare parts, a vision system for quality inspection. Asked which of them is changing how the plant or network runs today, most can name one or two at best.

This is not a technology problem. In our experience the models in most pilots work well enough. They fail to pay back because the decision they are meant to improve is not changed, the people who make it do not trust the output, or the value was never large enough to justify the effort of scaling.

## Start from the decision, not the data

Pilots usually begin with data that happens to be available. A team has five years of sensor readings, so it builds a model to predict failures. Only later does anyone ask who would act on the prediction, how often, and what they would do differently.

The use cases that pay back are chosen the other way round. They start with a decision that is made frequently, has a measurable cost when it is wrong and is made today on rules of thumb. Which assets to inspect this week. How much stock to hold at each depot. Which batches to test before release. If a better decision is worth a meaningful amount each time and the decision is made thousands of times a year, there is a case. If not, the model is unlikely to matter however accurate it is.

## Design for the person who has to act

A model that produces a risk score with no explanation asks frontline staff to take it on trust. Most will not, especially experienced engineers whose judgment has served them well for decades.

What works is giving people a reason they can check. In the grid maintenance program we describe in our case studies, every prediction came with the three factors driving it, such as rising oil temperature, an overload last month and a known weakness in the model of transformer. Crews could confirm the reasoning on site or overrule it. Overrules were recorded and used to retrain the model. Within a year, overrules fell from one prediction in four to fewer than one in ten, not because crews were told to comply, but because the list kept being right.

## Change the routine around the model

The biggest cost in scaling operations AI is rarely the model. It is the change to planning cycles, roles and incentives needed for the output to be used. Leaders tend to underinvest here by a wide margin.

The programs we have seen succeed share a few practical habits:

- The model's output appears in the system people already use to plan their work, not in a separate dashboard
- A specific meeting, usually the weekly planning review, is redesigned around the new information
- Supervisors are measured on the outcome the model is meant to improve, such as unplanned downtime, not on adherence to the old schedule
- A small team owns the model after launch, with time set aside to monitor accuracy and retrain it

As a rough guide, we budget about three dollars of process and change work for every dollar spent building the model. Companies that reverse that ratio tend to end up with accurate models nobody uses.

## Measure value the way finance does

Pilots are often judged on model accuracy. Finance teams do not care about accuracy; they care about cost, output and working capital. A use case should be measured against a baseline agreed with finance before work begins, using metrics the business already reports, and compared with a control group where possible.

This discipline also makes it easier to stop. Of the use cases we assessed for clients last year, we recommended stopping about half. Most were technically sound but too small to matter, or depended on data that would cost more to fix than the decision was worth. Stopping them freed the people and budget to scale the ones that did matter.

The result is a shorter list of AI initiatives, each with a clear owner and a number in the budget attached to it. That is less exciting than a portfolio of thirty pilots, and considerably more profitable.
