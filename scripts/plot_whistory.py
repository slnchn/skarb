import sys
import json

from plot_whistory_graph import plot_whistory_graph

whistoryString = sys.argv[1]
whistoryArray = json.loads(whistoryString)
plot_whistory_graph(whistoryArray)
