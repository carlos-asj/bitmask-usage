# Using the logic to convert binaries number into characters

### Main class

`class BinaryToASCII()`

### Constructor

```py
def __init__(self):
        self.ascii_map = {}
        self.init_ascii_data()
```

### Function to convert binary into decimal

```py
def bin_dec(self, bin):
        try:
            bin = bin.strip()
            if not all(c in '01' for c in bin):
                raise ValueError("Invalid binary. Use only 0's and 1's")
            return int(bin, 2)
        except ValueError as error:
            raise ValueError(f"Error while converting: {error}")
```

### Function to create the bit mask

```py
def dec_mask(self, decimal):
        if decimal == 32:
            bit_position = 0
        else:
            bit_position = decimal - 96
        
        return 1 << bit_position
```

### Initial data used

```py
def init_ascii_data(self):
        ascii_data = [
            {"decimal": 32, "carac": " "},
            {"decimal": 97, "carac": "a"},
            {"decimal": 98, "carac": "b"},
            {"decimal": 99, "carac": "c"},
            {"decimal": 100, "carac": "d"},
            {"decimal": 101, "carac": "e"},
            {"decimal": 102, "carac": "f"},
            {"decimal": 103, "carac": "g"},
            {"decimal": 104, "carac": "h"},
            {"decimal": 105, "carac": "i"},
            {"decimal": 106, "carac": "j"},
            {"decimal": 107, "carac": "k"},
            {"decimal": 108, "carac": "l"},
            {"decimal": 109, "carac": "m"},
            {"decimal": 110, "carac": "n"},
            {"decimal": 111, "carac": "o"},
            {"decimal": 112, "carac": "p"},
            {"decimal": 113, "carac": "q"},
            {"decimal": 114, "carac": "r"},
            {"decimal": 115, "carac": "s"},
            {"decimal": 116, "carac": "t"},
            {"decimal": 117, "carac": "u"},
            {"decimal": 118, "carac": "v"},
            {"decimal": 119, "carac": "w"},
            {"decimal": 120, "carac": "x"},
            {"decimal": 121, "carac": "y"},
            {"decimal": 122, "carac": "z"}
        ]

        for item in ascii_data:
            mask = self.dec_mask(item["decimal"])
            self.ascii_map[mask] = item["carac"]
```

### Get the character corresponding to the decimal number

```py
def find_char_mask(self, mask):
        return self.ascii_map.get(mask, None)
```

### Process the binary strings for one character or multiple

```py
def process_multiple_bin(self, bin_str):
        results = []
        for bin in bin_str:
            results.append(self.process_bin_str(bin))
        return results
    
    def process_bin_str(self, bin_str):
        result_chars = []
        for bin in bin_str:
            try:
                dec = self.bin_dec(bin)
                mask = self.dec_mask(dec)
                char = self.find_char_mask(mask)
                if char :
                    result_chars.append(char)
                else:
                    result_chars.append('?')
                    print(f"Debug: bin={bin}, dec={dec}, mask={mask} not found on map")
            except ValueError:
                result_chars.append('?')
        return ''.join(result_chars)
```

### CLI initializer

```py
def main():
    parser = argparse.ArgumentParser(
        description="Convert binary numberr into ASCII character using bitmasks"
    )
    
    parser.add_argument(
        "binaries", 
        nargs="+",
        help="Binaries number to convert (ex: 1100001 to 'a')"
    )
    
    parser.add_argument(
        "-j", "--join",
        action="store_true",
        help="Join the results in one string"
    )
    
    parser.add_argument(
        "-m", "--show-mask",
        action="store_true",
        help="Show the masks on result"
    )
    
    args = parser.parse_args()
    
    convert = BinaryToASCII()
    
    if args.join:
        result = convert.process_bin_str(args.binaries)
        print(result)
    else:
        results = convert.process_multiple_bin(args.binaries)
        for result in results:
            print(result)

if __name__ == "__main__":
    main()
```
