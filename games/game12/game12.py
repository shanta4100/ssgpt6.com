from framework.base_game import BaseGame
from framework.base_event import BaseEvent
from framework.base_state import BaseState
from enum import Enum, auto
import random


class Tier(Enum):
    STUDENT = auto()
    PROFESSIONAL = auto()
    TYCOON = auto()


class CareerState(BaseState):
    def __init__(self):
        super().__init__()
        self.day = 1
        self.tier = Tier.STUDENT
        self.energy = 10
        self.study_xp = 0
        self.career_xp = 0
        self.legacy_xp = 0
        self.reputation = 0
        self.log = ["A new life path begins."]

    def update(self):
        if self.energy <= 0:
            self.log.append("You are exhausted. Rest is required.")
        if self.legacy_xp >= 300:
            self.log.append("Your legacy is complete.")
            self.alive = False


class CareerEvent(BaseEvent):
    def __init__(self, name, action):
        super().__init__(name)
        self.action = action

    def apply(self, state: CareerState):
        self.action(state)


def rest_action(state):
    before = state.energy
    state.energy = min(10, state.energy + 3)
    state.log.append(f"Rested. Energy {before} → {state.energy}.")


def study_action(state):
    if state.energy <= 0:
        state.log.append("Too tired to study.")
        return
    state.energy -= 1
    state.study_xp += 5
    state.log.append("Studied. Study XP +5.")


def work_action(state):
    if state.energy <= 0:
        state.log.append("Too tired to work.")
        return
    state.energy -= 2
    state.career_xp += 7
    state.reputation += 1
    state.log.append("Worked. Career XP +7, Reputation +1.")


def legacy_action(state):
    if state.energy <= 0:
        state.log.append("Too tired for legacy work.")
        return
    state.energy -= 2
    state.legacy_xp += 10
    state.reputation += 2
    state.log.append("Legacy action. Legacy XP +10, Reputation +2.")


def tier_check(state):
    if state.tier == Tier.STUDENT and state.study_xp >= 100:
        state.tier = Tier.PROFESSIONAL
        state.log.append("You graduated! Now a Professional.")

    if state.tier == Tier.PROFESSIONAL and state.career_xp >= 200:
        state.tier = Tier.TYCOON
        state.log.append("You became a Tycoon!")


class Game12(BaseGame):
    def __init__(self):
        super().__init__("Game 12 — Career Climber Simulator", "game12")
        self.state = CareerState()

    def generate_event(self):
        actions = [
            ("Rest", rest_action),
            ("Study", study_action),
            ("Work", work_action),
            ("Legacy", legacy_action),
        ]
        name, action = random.choice(actions)
        return CareerEvent(name, action)

    def on_end(self):
        self.state.log.append("Your career journey concludes.")
        super().on_end()
