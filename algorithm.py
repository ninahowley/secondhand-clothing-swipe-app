import math
import numpy as np
import pandas as pd

from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

catalog = pd.read_csv("clothing.csv")

# TODO: from the app, get a user swipes where the information is similar
# to the catalog with an extra variable 1/0 where it shows if the person likes it or not
df = pd.read_csv("swiped.csv")  

# df = pd.read_csv("test_swipes.csv")


X = df[["style", "color", "type"]] # different categories
y = df["swipe"] # 1 or 0


# Initializes the Encoder
# One Hot Encoder changes all data values into 1 or 0 so that the data can be processed
encoder = OneHotEncoder(handle_unknown="ignore")
# Fit and Transforms to the array
X_encoded = encoder.fit_transform(X).toarray()


# Training and testing the model from the same data
X_train, X_test, y_train, y_test = train_test_split(
    X_encoded, y, test_size=0.2, random_state=42
)
print("X_test: ", len(X_test))
print("Y_test: ", len(y_test))
print("X_train: ", len(X_train))
print("Y_train: ", len(y_train))

# Create a regression to see what the user would like
model = LogisticRegression(max_iter=500)
model.fit(X_train, y_train)

print("✅ Model trained. Accuracy:", model.score(X_test, y_test))

def prediction(style, color, clothing_type):
    """Return probability that user likes an item"""
    X_new = pd.DataFrame(
        [[style, color, clothing_type]],
        columns=["style", "color", "type"]
    )
    X_new_encoded = encoder.transform(X_new).toarray()
    prob = model.predict_proba(X_new_encoded)[0][1]
    return prob

# Testing the algorithm
print("Emo top:", prediction("emo", "black", "top"))
print("Twee dress:", prediction("twee", "pink", "dress"))

def recommend_items():
    scores = []
    for _, row in df.iterrows():
        prob = prediction(row["style"], row['color'], row["type"])
        scores.append((row["image"], row["color"], row["style"], row["type"], prob))
   
    scored_df = pd.DataFrame(scores, columns=["image", "style", "color", "type", "score"])
    return scored_df.sort_values("score", ascending=False) # Returns a DataFrame of all swiped things in order of highest score to lowest

def recommend_outfits():

    global catalog # The catalog outside of the function
    catalog = catalog.copy() 

    # Score every item
    catalog["score"] = catalog.apply(lambda r: prediction(r["style"], r["color"], r["type"]), axis=1)

    likes = df[df["swipe"] == 1]  # only liked items
    style_counts = likes["style"].value_counts()
    total_likes = style_counts.sum() if len(style_counts) > 0 else 1  # avoid div by 0
    style_weights = {style: style_counts.get(style,0)/total_likes for style in catalog["style"].unique()}

    def weighted_score(row):
        base_score = prediction(row["style"], row["color"], row["type"])
        weight = style_weights.get(row["style"], 1.0)  # default 1 if unseen style
        return base_score * weight

    catalog["score"] = catalog.apply(weighted_score, axis=1)

    # Get all available types
    types = catalog['type'].unique()

    outfit = []

    can_top_bottom = "top" in types and "bottom" in types
    can_dresses = "dress" in types 

    
    # Best top and bottom score
    best_top_score = catalog[catalog["type"]=="top"]["score"].max()
    best_bottom_score = catalog[catalog["type"]=="bottom"]["score"].max()
    combo_score = (best_top_score + best_bottom_score) / 2.0
    # Best dress score
    best_dress_score = catalog[catalog["type"]=="dress"]["score"].max()
    if combo_score >= best_dress_score:
        # Recommend top-bottom
        best_top = catalog[catalog["type"]=="top"].loc[lambda x: x["score"].idxmax()]
        best_bottom = catalog[catalog["type"]=="bottom"].loc[lambda x: x["score"].idxmax()]
        outfit.extend([best_top["image"], best_bottom["image"]])
        exclude = ["dress"]
    else:
        # Recommend dress
        best_dress = catalog[catalog["type"]=="dress"].loc[lambda x: x["score"].idxmax()]
        outfit.append(best_dress["image"])
        exclude = ["top","bottom"]
    
    extra_types = [t for t in types if t not in exclude]
    for etype in extra_types:
        if etype in ["top","bottom","dress"]:  # skip core types (already chosen)
            continue
        items = catalog[catalog["type"]==etype]
        best_item = items.loc[items["score"].idxmax()]
        outfit.append(best_item["image"])

    return outfit



print(recommend_outfits())