#!/usr/bin/env python3
import json
import sys

def parse_lighthouse_report(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)

    # Extract opportunities
    print("\n=== OPTIMIZATION OPPORTUNITIES ===\n")
    opportunities = []

    opportunity_keys = [
        'render-blocking-resources',
        'unused-javascript',
        'unused-css-rules',
        'modern-image-formats',
        'uses-optimized-images',
        'uses-responsive-images',
        'efficient-animated-content',
        'unminified-css',
        'unminified-javascript',
        'uses-text-compression',
        'legacy-javascript',
        'total-byte-weight',
        'uses-long-cache-ttl',
        'dom-size',
        'critical-request-chains',
        'mainthread-work-breakdown',
        'bootup-time',
        'duplicated-javascript',
        'third-party-summary'
    ]

    for key in opportunity_keys:
        if key in data['audits']:
            audit = data['audits'][key]
            if audit.get('details') and (
                audit['details'].get('overallSavingsMs', 0) > 0 or
                audit['details'].get('overallSavingsBytes', 0) > 0 or
                audit.get('numericValue', 0) > 0
            ):
                savings_ms = audit['details'].get('overallSavingsMs', 0)
                savings_bytes = audit['details'].get('overallSavingsBytes', 0)
                savings_kb = savings_bytes / 1024 if savings_bytes else 0
                numeric_value = audit.get('numericValue', 0)

                opportunities.append({
                    'key': key,
                    'title': audit['title'],
                    'savings_ms': savings_ms,
                    'savings_kb': savings_kb,
                    'numeric_value': numeric_value,
                    'display_value': audit.get('displayValue', 'N/A'),
                    'description': audit.get('description', '')
                })

    # Sort by savings potential
    opportunities.sort(key=lambda x: x['savings_ms'] + (x['savings_kb'] * 10), reverse=True)

    for opp in opportunities:
        print(f"[{opp['key']}]")
        print(f"  Title: {opp['title']}")
        print(f"  Savings: {opp['savings_ms']:.0f}ms, {opp['savings_kb']:.0f}KB")
        print(f"  Display: {opp['display_value']}")
        print()

    # Extract specific resources
    print("\n=== RENDER-BLOCKING RESOURCES ===\n")
    if 'render-blocking-resources' in data['audits']:
        rbr = data['audits']['render-blocking-resources']
        if rbr.get('details') and rbr['details'].get('items'):
            for item in rbr['details']['items']:
                print(f"  {item.get('url', 'N/A')}")
                print(f"    Savings: {item.get('wastedMs', 0):.0f}ms")
                print()

    # Extract JavaScript usage
    print("\n=== UNUSED JAVASCRIPT ===\n")
    if 'unused-javascript' in data['audits']:
        uj = data['audits']['unused-javascript']
        if uj.get('details') and uj['details'].get('items'):
            for item in uj['details']['items'][:10]:  # Top 10
                url = item.get('url', 'N/A')
                wasted_kb = item.get('wastedBytes', 0) / 1024
                wasted_percent = item.get('wastedPercent', 0) * 100
                print(f"  {url.split('/')[-1][:60]}")
                print(f"    Wasted: {wasted_kb:.0f}KB ({wasted_percent:.0f}%)")
                print()

    # Extract image optimization
    print("\n=== IMAGE OPTIMIZATION ===\n")
    if 'modern-image-formats' in data['audits']:
        mif = data['audits']['modern-image-formats']
        if mif.get('details') and mif['details'].get('items'):
            for item in mif['details']['items']:
                url = item.get('url', 'N/A')
                savings_kb = item.get('wastedBytes', 0) / 1024
                print(f"  {url.split('/')[-1]}")
                print(f"    Potential savings: {savings_kb:.0f}KB")
                print()

    # Extract largest items
    print("\n=== NETWORK PAYLOAD ===\n")
    if 'network-requests' in data['audits']:
        nr = data['audits']['network-requests']
        if nr.get('details') and nr['details'].get('items'):
            items = sorted(nr['details']['items'],
                          key=lambda x: x.get('transferSize', 0),
                          reverse=True)[:15]
            for item in items:
                url = item.get('url', 'N/A')
                size_kb = item.get('transferSize', 0) / 1024
                resource_type = item.get('resourceType', 'other')
                print(f"  [{resource_type}] {url.split('/')[-1][:50]}")
                print(f"    Size: {size_kb:.0f}KB")
                print()

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: parse-lighthouse.py <lighthouse-report.json>")
        sys.exit(1)

    parse_lighthouse_report(sys.argv[1])
