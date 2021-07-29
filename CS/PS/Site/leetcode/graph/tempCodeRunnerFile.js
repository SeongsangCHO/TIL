et sorted = tmp.sort();

      for (let i of result) {
        if (sorted.join(",") === i.join(",")) {
          return;
        }
      }