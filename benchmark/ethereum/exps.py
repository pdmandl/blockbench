#!/bin/python

import os
import time
import sys

# running experiments
RATES = [8]
THREADS = [32]

# Testspezifikation Skalierungstest
EXPS = [(1, 100), (2, 100), (4, 100), (8, 100)]
ENV = 'env_eth.sh'
NNODES = [4, 8, 16, 32]
NCLIENTS = [4, 4, 4, 4]
# Testspezifikation klassischer Lasttest polygon
#CLASSIC_EXPS = [(2, 1), (2, 10), (2, 50), (2, 100), (2, 500), (2, 1000)]
#CLASSIC_ENV = 'env_polygon.sh'
#CLASSIC_NNODES = [8, 8, 8, 8, 8, 8]
#CLASSIC_NCLIENTS = [4, 4, 4, 4, 4, 4]


def change_config(run_no):
    f = open(ENV, 'r')
    envs = f.readlines()
    f.close()
    f = open(ENV, 'w')
    for l in envs:
        if l.startswith('LOG_DIR'):
            f.write(l[:l.find('results')]+'results_'+str(run_no)+'\n')
        else:
            f.write(l)
    f.close()


def run_exp(n, is_security=False):
    cmd = './run-bench.sh {} {} {} {}'
    if is_security:
        cmd = './run-bench-security {} {} {} {}'

    # for t in THREADS:
    #  for r in RATES:
    for (t, r) in EXPS:
        # run the experiments
        print cmd.format(n, t, n, r)
        os.system(cmd.format(n, t, n, r))


# python exps.py [-security/-donothing]
if __name__ == '__main__':
    error_msg = 'python exps.py [-security/-donothing] \n'\
        + '     no argument: run saturation benchmark \n'\
        + '     -security:   security benchmark \n'\
        + '     -donothing:  donothing benchmark\n'
    opts = ['-security', '-donothing']

    if len(sys.argv) > 2:
        print error_msg
    if len(sys.argv) == 2 and (not sys.argv in opts):
        print error_msg

    cp_cmd = 'cp env_ycsb.sh env.sh'
    os.system(cp_cmd)
    change_config(1)
    for n in NNODES:
        if len(sys.argv) > 1 and sys.argv[1] == '-security':
            run_exp(n, True)
        else:
            run_exp(n, False)

    # do-nothing option
    if len(sys.argv) > 1 and sys.argv[1] == '-donothing':
        time.sleep(10)
        cp_cmd = 'cp env_donothing.sh env.sh'
        os.system(cp_cmd)
        change_config(1)
        for n in NNODES:
            run_exp(n, False)

    print 'Done!'
