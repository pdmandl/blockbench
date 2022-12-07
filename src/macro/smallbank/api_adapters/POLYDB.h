#ifndef SMARTCONTRACT_DRIVERS_POLYDB_H_
#define SMARTCONTRACT_DRIVERS_POLYDB_H_

#include <string>
#include "DB.h"
#include "utils/timer.h"
#include "utils/utils.h"
#include "utils/spinlock.h"

#include <unordered_map>
#include <vector>
#include <cassert>

using std::string;
using std::unordered_map;
using std::vector;

class POLYDB : public DB
{
public:
    void Amalgate(unsigned acc1, unsigned acc2);
    void GetBalance(unsigned acc);
    void UpdateBalance(unsigned acc, unsigned amount);
    void UpdateSaving(unsigned acc, unsigned amount);
    void SendPayment(unsigned acc1, unsigned acc2, unsigned amount);
    void WriteCheck(unsigned acc, unsigned amount);

    static POLYDB *GetInstance(std::string dbname, std::string endpoint)
    {
        static POLYDB sb;
        sb.deploy(dbname, endpoint);
        return &sb;
    }

    POLYDB() {}
    POLYDB(std::string path, std::string endpoint)
    {
        deploy(path, endpoint);
    }

    void Init(unordered_map<string, double> *pendingtx, SpinLock *lock)
    {
        pendingtx_ = pendingtx;
        txlock_ = lock;
    }

    ~POLYDB() {}

    int get_tip_block_number();
    vector<string> poll_tx(int block_number);
    // int find_tip(string json);
    // vector<string> find_tx(string json);
    // string get_json_field(const string &json, const string &key);
private:
    void deploy(const std::string &dbname, const std::string &endpoint);
    void add_to_queue(string json);
    std::string endpoint_, from_address_, to_address_;
    unordered_map<string, double> *pendingtx_;
    SpinLock *txlock_;
};

#endif
